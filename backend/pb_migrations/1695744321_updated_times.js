/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jsl1dxdgjs6ulxz")

  collection.name = "acts"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1zmuoazg",
    "name": "artists",
    "type": "relation",
    "required": false,
    "presentable": true,
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
  const collection = dao.findCollectionByNameOrId("jsl1dxdgjs6ulxz")

  collection.name = "times"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1zmuoazg",
    "name": "act",
    "type": "relation",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "m821bxu2um5qzgw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
