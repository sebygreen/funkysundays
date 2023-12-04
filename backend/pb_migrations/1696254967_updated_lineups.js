/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8uurg6jmst014xx")

  collection.name = "schedule"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8uurg6jmst014xx")

  collection.name = "lineups"

  return dao.saveCollection(collection)
})
