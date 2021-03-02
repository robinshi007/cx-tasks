package bprometheus

import (
	"net/http"

	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func PrometheusHTTPHandlerPatternPair() HTTPHandlerPatternPair {
	return HTTPHandlerPatternPair{
		Pattern: "/metrics",
		Handler: HTTPHandler(),
	}
}

// HTTPHandler provides the Prometheus HTTP scrape handler.
func HTTPHandler() http.Handler {
	return promhttp.Handler()
}
