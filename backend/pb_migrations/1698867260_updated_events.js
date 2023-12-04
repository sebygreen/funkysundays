/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j3gj89lui1reawq")

  // remove
  collection.schema.removeField("itnta8db")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "twjaoz1p",
    "name": "category",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Promotional event",
        "A funky sunday"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j3gj89lui1reawq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "itnta8db",
    "name": "partners",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "Yvette de Marseille",
        "Voisins 105"
      ]
    }
  }))

  // remove
  collection.schema.removeField("twjaoz1p")

  return dao.saveCollection(collection)
})
