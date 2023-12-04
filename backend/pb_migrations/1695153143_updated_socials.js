/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6xy3w19m3olsdtc")

  // remove
  collection.schema.removeField("yp90un0l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jpfgfxjj",
    "name": "username",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "brdfy4nz",
    "name": "platform",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "instagram",
        "facebook",
        "snapchat"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6xy3w19m3olsdtc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yp90un0l",
    "name": "type",
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

  // remove
  collection.schema.removeField("jpfgfxjj")

  // remove
  collection.schema.removeField("brdfy4nz")

  return dao.saveCollection(collection)
})
