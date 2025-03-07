const request = require("request")

describe('Calc',()=>{
    it('should multiplie 2 and 2',()=>{
        expect(2*2).toBe(4)
    })
})

describe('get messages',()=>{
    it('should return 200 Ok',(done)=>{
        request.get(`http://localhost:3000/messages`,(err,res)=>{
            console.log(res.body)
            expect(res.statusCode).toEqual(200)
            done()
        })
    })

    it('should return a list that is not empty',(done)=>{
        request.get(`http://localhost:3000/messages`,(err,res)=>{
            console.log(res.body)
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })


   
})


describe('get message from user',()=>{
    it('should return 200 Ok',(done)=>{
        request.get(`http://localhost:3000/messages/Vahid Amiri`,(err,res)=>{
            // console.log(res.body)
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    
    it('the name should be Vahid Amiri',(done)=>{
        request.get(`http://localhost:3000/messages/Vahid Amiri`,(err,res)=>{
            // console.log(JSON.parse(res.body))
            expect(JSON.parse(res.body)[0].name).toEqual("Vahid Amiri")
            done()
        })
    })
})



describe("multiple",()=>{
    it("it should multiple 2 and 6",(done)=>{
        expect(2*6).toBe(12)
        done()
    })
})