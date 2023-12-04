/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jsl1dxdgjs6ulxz");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "jsl1dxdgjs6ulxz",
    "created": "2023-09-20 22:12:54.357Z",
    "updated": "2023-09-26 16:11:46.148Z",
    "name": "acts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "16bikefq",
        "name": "event",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "j3gj89lui1reawq",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "1zmuoazg",
        "name": "artists",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "m821bxu2um5qzgw",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "qkyt4g5p",
        "name": "start",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "hiift7ft",
        "name": "end",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
