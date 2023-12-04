/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6xy3w19m3olsdtc")

  collection.name = "links"

  // remove
  collection.schema.removeField("23x93gjh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7fnu72re",
    "name": "iframe",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jpfgfxjj",
    "name": "placeholder",
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

  // update
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
        "snapchat",
        "spotify",
        "soundcloud"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6xy3w19m3olsdtc")

  collection.name = "socials"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "23x93gjh",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "m821bxu2um5qzgw",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("7fnu72re")

  // update
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

  // update
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
})
