(ns changeme.core
  (:use compojure.core)
  (:require 
    [compojure.route :as route]
    [changeme.config :as config]
    [compojure.route :as util]
    [clojure.java.jdbc :as sql]
    [compojure.handler :as handler])
)

(def db-config (config/create-db-config "changeme"))

(defn get-data [id]
    (sql/with-connection db-config
       (sql/with-query-results rs [
                "select * 
                    from data 
                    where id = ?" 
            ]
         (get (first rs) :value)))
)



(defroutes main-routes
  (GET "/" [] "<h1>Hello World</h1>")
  (GET "/getdata" [id] (get-data id))
  (route/not-found "<h1>Page not found</h1>"))

(def app
  (handler/site main-routes))


