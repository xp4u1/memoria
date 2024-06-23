#!/bin/bash

admin_user=admin
admin_password=test

# Create system databases for single node setup
curl -X PUT http://$admin_user:$admin_password@localhost:5984/_users
curl -X PUT http://$admin_user:$admin_password@localhost:5984/_replicator
curl -X PUT http://$admin_user:$admin_password@localhost:5984/_global_changes

# Enable couch_peruser
curl -X PUT http://$admin_user:$admin_password@localhost:5984/_node/_local/_config/couch_peruser/enable -d '"true"'

# -------

username=paul
password=test
#database="userdb-$(echo -n "$username" | od -A n -t x1 | tr -d ' \n')"

curl -X PUT http://$admin_user:$admin_password@localhost:5984/_users/org.couchdb.user:$username \
     -H "Content-Type: application/json" \
     -d "{\"name\": \"$username\", \"password\": \"$password\", \"roles\": [], \"type\": \"user\"}"
