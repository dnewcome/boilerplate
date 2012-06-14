(ns changeme.config)

(defn create-db-config [database]
  {:classname "com.mysql.jdbc.Driver" 
   :subprotocol "mysql"
   :subname (str "//" "localhost" ":" "3306" (if (nil? database) (str "") (str "/" "changeme")))
   :user "root"
   :password "root"}
)
