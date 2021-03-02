package mw

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/middleware"

	"github.com/robinshi007/cx-tasks/infra/log"
)

func RequestLogger(l log.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)

			scheme := "http"
			if r.TLS != nil {
				scheme = "https"
			}
			reqID := middleware.GetReqID(r.Context())
			t1 := time.Now()
			defer func() {
				//if strings.HasPrefix(r.RequestURI, "/api") {
				l.WithField("status", ww.Status()).
					WithField("size", ww.BytesWritten()).
					WithField("duration", time.Since(t1)).
					WithField("req_id", reqID).
					WithField("scheme", scheme).
					WithField("host", r.Host).
					WithField("proto", r.Proto).
					WithField("remote_addr", r.RemoteAddr).
					Info(r.Context(), r.RequestURI)
				//}
			}()

			next.ServeHTTP(ww, r)
		}
		return http.HandlerFunc(fn)
	}
}
