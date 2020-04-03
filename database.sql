-- name of db:
 pet-hotel
 
CREATE TABLE "owners" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"num_pets" INT
	);

CREATE TABLE "pets" (
    "id" SERIAL PRIMARY KEY,
    "pet" VARCHAR NOT NULL,
    "breed" VARCHAR NOT NULL,
    "color" VARCHAR NOT NULL,
    "checked_in" VARCHAR NOT NULL,
    "owner_id" INT REFERENCES "owners"
);


-- TEST INFO FOR DB:
INSERT INTO "owners" ("name", "num_pets")
VALUES ('kyle', '1');

INSERT INTO "pets" ("pet", "breed", "color", "checked_in", "owner_id")
VALUES ('dog', 'mutt', 'fox color', '04/02/2020', '1');