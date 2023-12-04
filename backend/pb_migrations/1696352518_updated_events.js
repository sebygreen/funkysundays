/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j3gj89lui1reawq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zxanqhf8",
    "name": "sponsors",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "3o3ax08z27zyfrx",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j3gj89lui1reawq")

  // remove
  collection.schema.removeField("zxanqhf8")

  return dao.saveCollection(collection)
})
