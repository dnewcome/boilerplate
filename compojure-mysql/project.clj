(defproject changeme "1.0.0-SNAPSHOT"
  :description "FIXME: write description"
  :dependencies [
    [org.clojure/clojure "1.3.0"]
	[ring/ring-core "1.0.1"]
    [compojure "1.0.1"]
    [org.clojure/java.jdbc "0.1.1"]
    [mysql/mysql-connector-java "5.1.16"]
  ]
  :dev-dependencies [
	[lein-ring "0.4.6"]
  ]
  :ring {:handler changeme.core/app}
)
