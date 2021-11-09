export function getHost(hostUrl: string, defaultPort = "9867") {
  let [host, port] = hostUrl.split(":")
  port = port ? port : defaultPort
  return host + ":" + port
}
