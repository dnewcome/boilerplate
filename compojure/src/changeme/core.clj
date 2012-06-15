(ns changeme.core
  (:use compojure.core)
  (:require 
    [compojure.route :as route]
    [compojure.handler :as handler])
)

(defroutes main-routes
  (GET "/" [] "<h1>Hello World</h1>")
  (route/not-found "<h1>Page not found</h1>"))

(def app
  (handler/site main-routes))

