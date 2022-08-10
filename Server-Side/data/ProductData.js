import bcrypt from "bcrypt";


const salt = await bcrypt.genSalt();
export const data ={
    
    users:[
        {
            name:"Desmond",
            email:"mrfallback055@gmail.com",
            password:bcrypt.hashSync("desy53t3",salt),
            isAdmin:true
        },
        {
            name:"Mike",
            email:"desyscott055@gmail.com",
            password:bcrypt.hashSync("desy3123",salt),
            isAdmin:false
        },
          ],
products:[
    {
     
        image:"/images/img1.jpg",
        name:"Nike shirt",
        price:61.00,
        description:"This is a quality product",
        rating:5,
        numReviews:10,
        category:"shirt",
        countInStock:10
 
    },
    
    {
       
        image:"/images/img4.jpg",
        name:"lacoste shirts",
        price:40,
        description:"This is a quality product",
        rating:4,
        numReviews:7,
        category:"shirt",
        countInStock:15
     
    },
    
    {
      
        image:"/images/img10.jpg",
        name:"adidas shirt",
        price:100,
        description:"This is a quality product",
        rating:2,
        numReviews:8,
        category:"shirt",
        countInStock:0
     
    },
    {
        
        image:"/images/img5.jpeg",
        name:"hawaiin shirt",
        price:40,
        description:"This is a quality product",
        rating:1.5,
        numReviews:12,
        category:"shirt",
        countInStock:12
     
    },
    {
    
        image:"/images/img2.jpg",
        name:"suit",
        price:160,
        description:"This is a quality product",
        rating:4.5,
        numReviews:20,
        category:"shirt",
        countInStock:0
     
    },
    {
      
        image:"/images/img6.jpg",
        name:"sleeve shirt",
        price:40,
        description:"This is a quality product",
        rating:4.5,
        numReviews:7,
        category:"shirt",
        countInStock:20
    },
    {
        
        image:"/images/img7.png",
        name:"tomford shirt",
        price:470,
        description:"This is a quality product",
        rating:.5,
        numReviews:0,
        category:"shirt",
        countInStock:2
    },
    {
   
        image:"/images/suit.jpg",
        name:"tomford suit",
        price:470,
        description:"This is a quality product",
        rating:1,
        numReviews:10,
        category:"shirt",
        countInStock:30
    },

    
]
}