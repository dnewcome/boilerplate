(ns changeme.util)

(defn load-properties
  "load and return a properties file"
  [filename]
  (println "loading resources file " filename);
  (let [properties (doto (java.util.Properties.)
    (.load
      (-> (Thread/currentThread)
        (.getContextClassLoader)
        (.getResourceAsStream filename))))]
    (reduce merge {}
      (for [key (.keySet properties)]
        {key (.get properties key)}
        )))
)

