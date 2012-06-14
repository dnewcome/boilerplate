;; create tables script
(ns changeme.create
 (:require 
  [changeme.config :as config]
  [clojure.java.jdbc :as sql])
)

(def db-config (config/create-db-config "changeme"))

(defn create-database [name] 
  (sql/with-connection db-config 
    (sql/do-commands (str "create database " name))) 
)
(defn drop-database [name] 
  (sql/with-connection db-config 
    (sql/do-commands (str "drop database " name))) 
)

(defn create-test-table
  "Create a table to store data"
  []
  (sql/with-connection db-config
    (sql/create-table
      :data
      [:id :bigint "PRIMARY KEY" "AUTO_INCREMENT"]
      ["value" "longtext" "NOT NULL"]
      )))

(defn drop-test-table
  "Create a table to store data"
  []
  (sql/with-connection db-config
    (sql/drop-table :data)))

(defn get-data [id]
    (sql/with-connection db-config
       (sql/with-query-results rs [
                "select * 
                    from data 
                    where id = ?", id 
            ]
         (get (first rs) :value)))
)

;(create-database "changeme")
;(drop-database "changeme")

;(drop-test-table)
;(create-test-table)
(println (get-data 1))
;(println "working")
