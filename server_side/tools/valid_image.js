module.exports = function() {
    this.validImage = function (str) {
    var pattern = /https:/;
    return pattern.test(str);
  }
}