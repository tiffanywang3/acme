/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Product = Promise.promisifyAll(mongoose.model('Product'));

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            first_name: 'Omri'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            type: 'admin',
            first_name: 'Barack',
            last_name: 'Obama'
        }
    ];

    return User.createAsync(users);

};

var seedProducts = function() {
    var products = [
  {
    "show_name": "Pokemon",
    "category": ["Accesories"],
    "product_name": "Great Ball",
    "unit_price": 30000,
    "imageUrl": "/images/pokemon_greatball.jpg",
    "description": "Catch Pokemon with a good success rate.",
    "inventory": 25
  },
  {
    "show_name": "Pokemon",
    "category": ["Accesories"],
    "product_name": "Poke Ball",
    "unit_price": 10000,
    "imageUrl": "/images/pokemon_pokeball.png",
    "description": "Catch Pokemon with a low success rate.",
    "inventory": 30
  },
  {
    "show_name": "Pokemon",
    "category": ["Accesories"],
    "product_name": "Ash's Hat",
    "unit_price": 249900,
    "imageUrl": "/images/pokemon_hat.jpg",
    "description": "Look like Ash when you catch 'em!",
    "inventory": 250
  },
  {
    "show_name": "Pokemon",
    "category": ["Creatures"],
    "product_name": "Vulpix",
    "unit_price": 300000,
    "imageUrl": "/images/pokemon_vulpix.png",
    "description": "Vulpix, a Fox Pokemon. Its six tails are extremely beautiful. As it evolves, it grows even more tails. Vulpix uses powerful flame attacks.",
    "inventory": 1
  },
  {
    "show_name": "Pokemon",
    "category": ["Creatures"],
    "product_name": "Oddish",
    "unit_price": 252700,
    "imageUrl": "/images/pokemon_oddish.png",
    "description": "Oddish. This Pokemon is typically found roaming the forest, scattering pollen as it walks around.",
    "inventory": 4
  },
  {
    "show_name": "Pokemon",
    "category": ["Creatures"],
    "product_name": "Bulbasaur",
    "unit_price": 30000,
    "imageUrl": "/images/pokemon_bulbasaur.png",
    "description": "Bulbasaur. It bears the seed of a plant on its back from birth. The seed slowly develops. Researchers are unsure whether to classify Bulbasaur as a plant or animal. Bulbasaur are extremely calm and very difficult to capture in the wild.",
    "inventory": 35
  },
  {
    "show_name": "Popeye",
    "category": ["Food"],
    "product_name": "Spinach",
    "unit_price": 800,
    "imageUrl": "/images/popeyes-spinach.png",
    "description": " As Popeye says, I yam what I yam",
    "inventory": 1000
  },
  {
    "show_name": "The Simpsons",
    "category": ["Food"],
    "product_name": "Donuts",
    "unit_price": 150,
    "imageUrl": "/images/simpsons-donut.jpeg",
    "description": "Mmm, d'oh-nuts.",
    "inventory": 2000
  },
  {
    "show_name": "The Simpsons",
    "category": ["Food"],
    "product_name": "Duff Beer",
    "unit_price": 1200,
    "imageUrl": "/images/simpsons-duff.png",
    "description": "Duff Beer for me, Duff Beer for you, I'll have a Duff, You'll have one too",
    "inventory": 2000
  },
  {
    "show_name": "The Simpsons",
    "category": ["Food"],
    "product_name": "Krusty Burger",
    "unit_price": 750,
    "imageUrl": "/images/simpsons-krustyburger.jpg",
    "description": "Made from 7 different animal fats.",
    "inventory": 500
  },
  {
    "show_name": "Looney Tunes",
    "category": ["Weapons"],
    "product_name": "Anvil",
    "unit_price": 59900,
    "imageUrl": "/images/loonytunes_anvil.jpg",
    "description": "Classical warfare.",
    "inventory": 100
  },
  {
    "show_name": "Spongebob Squarepants",
    "category": ["Food"],
    "product_name": "Krabby Patty",
    "unit_price": 750,
    "imageUrl": "/images/spongebob-krabbypatty.gif",
    "description": "The best burger under the sea.",
    "inventory": 50000
  },
  {
    "show_name": "Spongebob Squarepants",
    "category": ["Home"],
    "product_name": "Pineapple House",
    "unit_price": 8000,
    "imageUrl": "/images/spongebob_pineapple.jpg",
    "description": "Live under the sea.",
    "inventory": 10
  },
  {
    "show_name": "Scooby Doo",
    "category": ["Food"],
    "product_name": "Scooby Snack",
    "unit_price": 599,
    "imageUrl": "/images/scoobydoo_scoobysnack.jpg",
    "description": "Tasty treat, best when solving mysteries.",
    "inventory": 1000
  },
  {
    "show_name": "Bob's Burgers",
    "category": ["Food"],
    "product_name": "Gourdon Hamsey Burger",
    "unit_price": 750,
    "imageUrl": "/images/bobsburgers-gourdonhamseyburger.jpg",
    "description": "Comes with squash & ham",
    "inventory": 200
  },
  {
    "show_name": "The Simpsons",
    "category": ["Accessories"],
    "product_name": "Lisa's saxophone",
    "unit_price": 2000,
    "imageUrl": "/images/simpsons-lisassaxophone.png",
    "description": "Dear Lisa, May Your New Saxophone Bring You Many Years Of D'oh!",
    "inventory": 50
  },
  {
    "show_name": "The Simpsons",
    "category": ["Accessories"],
    "product_name": "Old, old spice",
    "unit_price": 500,
    "imageUrl": "/images/simpsons-oldoldspice.png",
    "description": "The Old, Old Spice is a Grampa's smell",
    "inventory": 200
  },
  {
    "show_name": "The Simpsons",
    "category": ["Accessories"],
    "product_name": "Vac-u-bot",
    "unit_price": 2500,
    "imageUrl": "/images/simpsons-vacubot.png",
    "description": "A robotic vacuuming machine",
    "inventory": 250
  },
  {
    "show_name": "The Simpsons",
    "category": ["Vehicles"],
    "product_name": "The Homer",
    "unit_price": 8200000,
    "imageUrl": "/images/simsons-thehomer.png",
    "description": "Designed for the average American. Comes with three horns, as you can never find a horn when you're mad.",
    "inventory": 5
  },
  {
    "show_name": "The Simpsons",
    "category": ["Food"],
    "product_name": "Frosted Krusty-Os",
    "unit_price": 250,
    "imageUrl": "/images/simpsons-frostedkrustyos.jpg",
    "description": "It is made with 10% real food",
    "inventory": 1000
  },
  {
    "show_name": "The Simpsons",
    "category": ["Food"],
    "product_name": "Kwik-E-Mart Squishee",
    "unit_price": 500,
    "imageUrl": "/images/simpsons_squishee.jpg",
    "description": "Definitely not a Slurpee.",
    "inventory": 1000
  },
  {
    "show_name": "South Park",
    "category": ["Clothes"],
    "product_name": "Kenny's Orange Parka",
    "unit_price": 14900,
    "imageUrl": "/images/southpark_kenny_parka.jpg",
    "description": "Keep warm in Kenny's parka",
    "inventory": 50
  },
  {
    "show_name": "South Park",
    "category": ["Food"],
    "product_name": "Cheesy Poofs",
    "unit_price": 200,
    "imageUrl": "/images/southpark_cheesypoofs.png",
    "description": "Cartman's favorite snack",
    "inventory": 2000
  },
  {
    "show_name": "South Park",
    "category": ["Clothes"],
    "product_name": "Mr. Hankey Costume",
    "unit_price": 3500,
    "imageUrl": "/images/southpark_mrhankeycostume.jpg",
    "description": "Dress up like Mr. Hankey",
    "inventory": 200
  },
  {
    "show_name": "South Park",
    "category": ["Home"],
    "product_name": "Christmas Critters Family Portrait",
    "unit_price": 2000,
    "imageUrl": "/images/southpark_christmascritters.jpg",
    "description": "CHRISTMAS critters",
    "inventory": 300
  },
  {
    "show_name": "Looney Tunes",
    "category": ["Weapons"],
    "product_name": "Do-it-yourself Tornado Kit",
    "unit_price": 2000,
    "imageUrl": "/images/looneytunes-tornadokit.jpg",
    "description": "Cause some distruction with a tornado kit",
    "inventory": 150
  },
  {
    "show_name": "Looney Tunes",
    "category": ["Accessories"],
    "product_name": "Jet-propelled Tennis Shoes",
    "unit_price": 1500,
    "imageUrl": "/images/looneytunes-jetpropelledtennisshoes.jpg",
    "description": "Shoot for the stars with Jet Propelled Tennis Shoes",
    "inventory": 200
  },
  {
    "show_name": "Looney Tunes",
    "category": ["Accessories"],
    "product_name": "Giant Kite Kit",
    "unit_price": 3500,
    "imageUrl": "/images/looneytunes-giantkitekit.jpg",
    "description": "Fly a GIANT kite",
    "inventory": 125
  },
  {
    "show_name": "Looney Tunes",
    "category": ["Clothes"],
    "product_name": "Super Outfit",
    "unit_price": 2500,
    "imageUrl": "/images/looneytunes-superoutfit.jpg",
    "description": "Be super with this outfit",
    "inventory": 300
  },
  {
    "show_name": "Looney Tunes",
    "category": ["Weapons"],
    "product_name": "Earthquake Pills",
    "unit_price": 2000,
    "imageUrl": "/images/looneytunes-earthquakepills.jpg",
    "description": "Make a statement with earthquake pills",
    "inventory": 50
  },
  {
    "show_name": "The Simpsons",
    "category": ["Home"],
    "product_name": "Burns portrait",
    "unit_price": 35000,
    "imageUrl": "/images/simpsons-burnsportrait.png",
    "description": "Only the best of the best can have this EXCELLENT portrait",
    "inventory": 20
  },
  {
    "show_name": "The Simpsons",
    "category": ["Home"],
    "product_name": "Clown Bed",
    "unit_price": 15000,
    "imageUrl": "/images/simpsons-clownbed.png",
    "description": "Goodnight moon, goodnight clown",
    "inventory": 10
  },
  {
    "show_name": "Avatar",
    "category": ["Clothes"],
    "product_name": "Aang Costume",
    "unit_price": 100000,
    "imageUrl": "/images/avatar_aang.jpg",
    "description": "Dress like Air Nation native Avatar Aang! Air-bending capabilities sold separately.",
    "inventory": 50
  },
  {
    "show_name": "Avatar",
    "category": ["Clothes"],
    "product_name": "Katara Costume",
    "unit_price": 100000,
    "imageUrl": "/images/avatar_katara.jpg",
    "description": "Dress like Water Nation native Katara! Water-bending capabilities sold separately.",
    "inventory": 50
  },
  {
    "show_name": "Avatar",
    "category": ["Clothes"],
    "product_name": "Sokka Costume",
    "unit_price": 100000,
    "imageUrl": "/images/avatar_sokka.png",
    "description": "Dress like Water Nation native Sokka!",
    "inventory": 50
  },
  {
    "show_name": "Avatar",
    "category": ["Clothes"],
    "product_name": "Toph Costume",
    "unit_price": 100000,
    "imageUrl": "/images/avatar_toph.jpg",
    "description": "Dress like Earth Nation native Toph! Earth-bending capabilities sold separately.",
    "inventory": 50
  },
  {
    "show_name": "Avatar",
    "category": ["Clothes"],
    "product_name": "Zuko Costume",
    "unit_price": 100000,
    "imageUrl": "/images/avatar_zuko.jpg",
    "description": "Dress like Fire Nation native Zuko! Fire-bending capabilities sold separately.",
    "inventory": 5000
  },
  {
    "show_name": "Avatar",
    "category": ["Clothes"],
    "product_name": "Iroh Costume",
    "unit_price": 1000000,
    "imageUrl": "/images/avatar_iroh.jpg",
    "description": "Dress like Fire Nation native General Iroh! Fire-bending capabilities sold separately.",
    "inventory": 5000
  },
  {
    "show_name": "Avatar",
    "category": ["Weapons"],
    "product_name": "Air Staff",
    "unit_price": 1000000,
    "imageUrl": "/images/avatar_airstaff.jpg",
    "description": "Fly around with ease! ",
    "inventory": 10000
  },
  {
    "show_name": "Avatar",
    "category": ["Weapons"],
    "product_name": "Boomerang",
    "unit_price": 50000,
    "imageUrl": "/images/avatar_sokkaboomerang.jpg",
    "description": "This trusty weapon will always come back to you. ",
    "inventory": 5000
  },
  {
    "show_name": "Avatar",
    "category": ["Creatures"],
    "product_name": "Flying Bison",
    "unit_price": 100000000,
    "imageUrl": "/images/avatar_flyingbison.jpg",
    "description": "A descendent of the mighty Appa - a friend for life!",
    "inventory": 400
  },
  {
    "show_name": "Avatar",
    "category": ["Creatures"],
    "product_name": "Flying Lemur",
    "unit_price": 6000000,
    "imageUrl": "/images/avatar_flyinglemur.jpg",
    "description": "Will eat all your lychee berries, loyal friend.",
    "inventory": 100
  },
  {
    "show_name": "Adventure Time",
    "category": ["Accessories"],
    "product_name": "Finn's Hat",
    "unit_price": 50000,
    "imageUrl": "/images/adventuretime_finnhat.jpg",
    "description": "Finn's hat is a piece of headgear that Finn wears throughout the Adventure Time series",
    "inventory": 100
  },
  {
    "show_name": "Adventure Time",
    "category": ["Accessories"],
    "product_name": "Jake Hat",
    "unit_price": 50000,
    "imageUrl": "/images/adventuretime_jakehat.jpg",
    "description": "Jake's hat",
    "inventory": 100
  },
  {
    "show_name": "Adventure Time",
    "category": ["Accessories"],
    "product_name": "Princess Bubblegum Crown",
    "unit_price": 5000000,
    "imageUrl": "/images/adventuretime_pbcrown.jpg",
    "description": "Princess Bubblegum's crown is a golden circlet with an inlaid turquoise jewel at the pinnacle and worn by Princess Bubblegum to signify her monarchy to the Candy Kingdom",
    "inventory": 800
  },
  {
    "show_name": "Adventure Time",
    "category": ["Accessories"],
    "product_name": "Marceline's Bass",
    "unit_price": 100000,
    "imageUrl": "/images/adventuretime_marcelinebass.jpg",
    "description": "Be like the true Vampire Queen",
    "inventory": 900
  },
  {
    "show_name": "Adventure Time",
    "category": ["Weapons"],
    "product_name": "Gumball Guardian",
    "unit_price": 1000000,
    "imageUrl": "/images/adventuretime_gumbball.jpg",
    "description": "Best protection in the land",
    "inventory": 50
  },
  {
    "show_name": "Adventure Time",
    "category": ["Weapons"],
    "product_name": "Finn's Sword",
    "unit_price": 5000000,
    "imageUrl": "/images/adventuretime_finnsword.jpg",
    "description": "The weapon of a true hero",
    "inventory": 25
  },
  {
    "show_name": "Adventure Time",
    "category": ["Weapons"],
    "product_name": "Enchiridion",
    "unit_price": 1000000,
    "imageUrl": "/images/adventuretime_enchiridion.png",
    "description": "Are you a hero? Get the Enchiridion",
    "inventory": 20
  },
  {
    "show_name": "Adventure Time",
    "category": ["Accessories"],
    "product_name": "Ice King's Crown",
    "unit_price": 500000,
    "imageUrl": "/images/adventuretime_icekingcrown.jpg",
    "description": "Be an Ice King",
    "inventory": 100
  },
  {
    "show_name": "Scooby Doo",
    "category": ["Vehicles"],
    "product_name": "Mystery Machine",
    "unit_price": 6000000,
    "imageUrl": "/images/scoobydoo_mysterymachine.jpg",
    "description": "The Classic Mystery Machine",
    "inventory": 30
  },
  {
    "show_name": "Care Bears",
    "category": ["Vehicles"],
    "product_name": "Care-A-Lot Cloudmobile",
    "unit_price": 6500000,
    "imageUrl": "/images/carebears-carealotcloudmobile.jpg",
    "description": "Zoom through the clouds with the Care-A-Lot Cloudmobile",
    "inventory": 50
  },
  {
    "show_name": "Ghostbusters",
    "category": ["Vehicles"],
    "product_name": "ECTO-1",
    "unit_price": 7000000,
    "imageUrl": "/images/ghostbusters-ecto1.gif",
    "description": "When someone calls, get there fast with the ECTO-1",
    "inventory": 20
  },
  {
    "show_name": "Spongebob Squarepants",
    "category": ["Vehicles"],
    "product_name": "Invisible Boat Mobile",
    "unit_price": 9000000,
    "imageUrl": "/images/spongebob-invisibleboatmobile.jpg",
    "description": "Own the original Invisible Boatmobile previously owned by Mermaid Man and Barnacle Boy",
    "inventory": 10
  }
]

        return Product.createAsync(products);

}

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    })
    .then(function() {
        return seedProducts();
    })
    .then(function (products) {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
