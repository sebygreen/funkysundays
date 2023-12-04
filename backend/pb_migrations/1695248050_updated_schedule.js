/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jsl1dxdgjs6ulxz")

  collection.name = "times"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jsl1dxdgjs6ulxz")

  collection.name = "schedule"

  return dao.saveCollection(collection)
})
