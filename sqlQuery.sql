CREATE SEQUENCE cliente_id_client_seq;


CREATE TABLE cliente
(
    id_client integer NOT NULL DEFAULT nextval('cliente_id_client_seq'),
    name_client character varying(300) NOT NULL DEFAULT '',
    ape_client character varying(300) NOT NULL  DEFAULT '',
    fec_naci date DEFAULT now(),
    edad_client integer NOT NULL  DEFAULT 0,
    CONSTRAINT id_client PRIMARY KEY (id_client)
)

CREATE OR REPLACE FUNCTION __create_client_01(
	__p_name_cli character varying(300),
	__p_ape_cli  character varying(300),
	__p_fech_nac character varying(300),
	__p_edad_cli integer
)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$
DECLARE
   ---CONSTANTES
  STATUS_SUCCESS CONSTANT INTEGER           DEFAULT 0;
  STATUS_CONTROL CONSTANT INTEGER           DEFAULT 1;
  STATUS_ERROR   CONSTANT INTEGER           DEFAULT 2; 
  ERROR_GENERICO CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';
  ---VARIABLES    
  __v_estruct_matriz JSONB;
  __v_count_user     INTEGER;
  __v_fecha_parse    DATE;
  
  __JSONB_RPTA    	 JSONB;
  __msj_excep     	 TEXT;
BEGIN
	IF __p_name_cli IS NULL OR __p_ape_cli IS NULL OR __p_fech_nac IS NULL OR __p_edad_cli IS NULL THEN
		RAISE EXCEPTION USING ERRCODE = 'SMILE', MESSAGE = 'Los campos no estan completos.';
	END IF;
	
	__v_fecha_parse = TO_DATE(__p_fech_nac, 'DD-MM-YYYY');
	
	SELECT COUNT(1)
	  INTO __v_count_user
	  FROM cliente
  	 WHERE name_client ~* __p_name_cli
	   AND ape_client  ~* __p_ape_cli
	   AND fec_naci    =  __v_fecha_parse
	   AND edad_client = __p_edad_cli;
	
	IF __v_count_user > 0 THEN
		RAISE EXCEPTION USING ERRCODE = 'SMILE', MESSAGE = 'Lo sentimos ya existe un usuario con este nombre .';
	END IF;
	
	INSERT INTO cliente (name_client, ape_client, fec_naci, edad_client)
		 VALUES (__p_name_cli, __p_ape_cli, __v_fecha_parse, __p_edad_cli)
	ON CONFLICT (id_client) DO NOTHING;
				 
	__JSONB_RPTA := JSONB_BUILD_OBJECT('status', STATUS_SUCCESS,
									   'msj'   , 'Se registro el cliente correctamente');
	RETURN __JSONB_RPTA;
EXCEPTION
    WHEN SQLSTATE 'SMILE' THEN
        __JSONB_RPTA := JSONB_BUILD_OBJECT('msj'   , SQLERRM,
                                           'status', STATUS_CONTROL);
    RETURN __JSONB_RPTA;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msj_excep = PG_EXCEPTION_CONTEXT;
        __JSONB_RPTA := JSONB_BUILD_OBJECT('msj'        , ERROR_GENERICO,
                                           'status'     , STATUS_ERROR,
                                           'stack_error', CONCAT(SQLERRM, ' - ', __msj_excep));
    RETURN __JSONB_RPTA;
END;
$BODY$;