/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6xy3w19m3olsdtc")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7fnu72re",
    "name": "embed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6xy3w19m3olsdtc")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7fnu72re",
    "name": "iframe",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
