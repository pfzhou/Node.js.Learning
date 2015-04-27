var assert = require("assert")
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(-1));
    })
  })
})

// describe('Array', function(){
//   describe('#indexOf()', function(){
//     it('should return -1 when the value is not present', function(){
//       [1,2,3].indexOf(5).should.equal(-1);
//       [1,2,3].indexOf(0).should.equal(-1);
//     })
//   })
// })

// describe('User', function(){
//   describe('#save()', function(){
//     it('should save without error', function(done){
//       var user = new User('Luna');
//       user.save(function(err){
//         if (err) throw err;
//         done();
//       });
//     })
//   })
// })

describe('test case 1', function(){
	it('测试断言1', function(){
		assert.equal(1, 1);
		assert.notEqual('zpf', 'z'+' pf');
	})
	it('测试断言2', function(){
		var a = new Object();
		var b = new Object();
		assert.deepEqual(a, b);
		assert.notStrictEqual(a, b, 'one object!');
	})

	it('测试断言3', function(){
		assert.throws(
	  		function() {
	    		throw new Error("Wrong value");
	  		},
	  		Error
		);
	})

})