const Tutorial = () => {
    return ( 
        <div>
            <p>
            T3 Api Docs
API2 is simple backend multipurpose API webservices for performing backend activity, getting, adding, changing or deleting data on database.

It is based on basic methods: Get, Post, Put, Delete and SaveChanges

It's simple to use, only thing to do is to create table on backend database, define queries and fetch or change data by calling those basic methods.

Basic Usage
Before begining let's create sample table, connect to sample database and create table:

Connect to SQL server
server:t3-ks.com
user: devs
pwd: **********

Connect to SQL server and create sample table TestItems:
<code>
CREATE TABLE TestItems(id INT PRIMARY KEY IDENTITY(1,1), itemName VARCHAR(50), barcode VARCHAR(50), price decimal(18,2))
</code>
            </p>
        </div>
     );
}
 
export default Tutorial;