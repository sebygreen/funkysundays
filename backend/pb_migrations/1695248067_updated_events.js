/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j3gj89lui1reawq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zykrvcwj",
    "name": "times",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "jsl1dxdgjs6ulxz",
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
  collection.schema.removeField("zykrvcwj")

  return dao.saveCollection(collection)
})