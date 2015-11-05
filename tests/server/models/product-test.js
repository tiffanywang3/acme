var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Product = mongoose.model('Product');

describe('Product model', function() {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Product).to.be.a('function');
    });

    it('can be created with all fields', function(done){
            Product.create({
                product_name: "The Name",
                category: ["food"],
                show_name: "The Simpsons",
                description: "It's great",
                imageUrl: "/images/whatever.jpg",
                inventory: 5,
                unitPrice: 99.99
            })
                .then(function(product){
                    expect(product.product_name).to.be.equal("The Name");
                    expect(product.imageUrl).to.be.equal("/images/whatever.jpg");
                    expect(product.unitPrice).to.be.equal(99.99);
                    done();
                })
    })

    it('cannot be created (throws error) when a field is missing', function(done){
        var prod = new Product({
            product_name: "The Name",
            show_name: "The Simpsons",
            imageUrl: "/images/whatever.jpg",
            inventory: 5,
            unitPrice: 99.99
        })
            prod.save(function(err, product){
                expect(err.message).to.equal("Product validation failed");
                done();
            })
    })

    it('cannot be created (throws error) when name is not unique', function(done){
        Product.create({
            product_name: "The Name",
            category: ["food"],
            show_name: "The Simpsons",
            description: "It's great",
            imageUrl: "/images/whatever.jpg",
            inventory: 5,
            unitPrice: 99.99
        },
            {product_name: "The Name",
                category: ["food"],
                show_name: "The Simpsons",
                description: "It's great",
                imageUrl: "/images/whatever.jpg",
                inventory: 5,
                unitPrice: 99.99
            })
            .then(function(products){
            }, function(err){
                expect(err.message).to.contain("duplicate key error");
                done();
            })
    })

    it('will assign a default image if none is provided', function(done){
        var prod = new Product({
            product_name: "The Name",
            category: ["food"],
            show_name: "The Simpsons",
            description: "It's great",
            inventory: 5,
            unitPrice: 99.99
        })
        prod.save(function(err, product){
            console.log("product", product);
            expect(product.imageUrl).to.equal("/images/placeholder.png");
            done();
        })
    })

    it('can have multiple categories', function(done){
        var prod = new Product({
            product_name: "The Name",
            category: ["food", "clothes"],
            show_name: "The Simpsons",
            description: "It's great",
            imageUrl: null,
            inventory: 5,
            unitPrice: 99.99
        })
        prod.save(function(err, product){
            console.log("product", product);
            expect(product.category.length).to.equal(2);
            done();
        })
    })

})
