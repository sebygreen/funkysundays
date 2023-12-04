/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m821bxu2um5qzgw")

  // remove
  collection.schema.removeField("ccmrrjkw")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m821bxu2um5qzgw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ccmrrjkw",
    "name": "links",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "6xy3w19m3olsdtc",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
