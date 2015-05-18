/**
 * Check if a featureToggle is present as a url parameter
 *
 *
 */
function featureSupported(feature, parameters) {
    if (parameters) {
        var parameterA = parameters.split(/\?|&/g);
        for (var i = 0; i < parameterA.length; i++) {
            var parameter = parameterA[i];
            if (parameter) {
                if (isParameterTrue(parameter, feature)) {
                    return true;
                }
            }
        }
    }
    return false;

}

/**
 * Check if a url parameter is the target parameter and returns true if
 *      1) the url parameter has no value at all
 *      2) the value of the url parameter is true (case ignored) or 1
 * Returns false otherwise
 *
 * @Param {String} urlParameter
 * @Param {String} targetParameter
 */
function isParameterTrue(urlParameter, targetParameter) {
    if (urlParameter && targetParameter) {
        var strA = urlParameter.split("=");
        if (strA[0].trim() == targetParameter) {
            if (strA[1]) {
                var value = strA[1].trim().toLowerCase();
                if (value == "1" || value == "true") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    return false;
}

module.exports = featureSupported;
