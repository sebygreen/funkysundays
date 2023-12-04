/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6xy3w19m3olsdtc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xqfaczxs",
    "name": "acts",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "m821bxu2um5qzgw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6xy3w19m3olsdtc")

  // remove
  collection.schema.removeField("xqfaczxs")

  return dao.saveCollection(collection)
})
