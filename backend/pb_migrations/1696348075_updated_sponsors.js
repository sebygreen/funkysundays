/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3o3ax08z27zyfrx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qhvjxos3",
    "name": "event",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "j3gj89lui1reawq",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3o3ax08z27zyfrx")

  // remove
  collection.schema.removeField("qhvjxos3")

  return dao.saveCollection(collection)
})
