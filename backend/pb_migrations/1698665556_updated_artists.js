/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m821bxu2um5qzgw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "po1lmc8t",
    "name": "field",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "DJ",
        "Group"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m821bxu2um5qzgw")

  // remove
  collection.schema.removeField("po1lmc8t")

  return dao.saveCollection(collection)
})