var vars = readFile('katt.config').split('\n')

var config = {}
for (i in vars) {
  var pair = vars[i].split('=')
  config[pair[0]] = pair[1]
}
