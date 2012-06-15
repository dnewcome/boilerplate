(ns changeme.util)

(defn load-properties
  "load properties file from disk according to resources path"
  [filename]
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

