/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m821bxu2um5qzgw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zp40jybl",
    "name": "slug",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m821bxu2um5qzgw")

  // remove
  collection.schema.removeField("zp40jybl")

  return dao.saveCollection(collection)
})
