
global.__isNull = function (value, msj = 'Accion no permitida') {
    if (typeof value == 'object' && value != null) {
        for (var elm of value) {
            if (String(elm).trim() == null || String(elm).trim() == '' || String(elm).trim() == 'null' || elm == undefined) {
                throw msj;
            }
        }
    } else {
        if (String(value).trim() == null || String(value).trim() == '' || String(value).trim() == 'null' || value == undefined) {
            throw msj;
        }
    }
}
