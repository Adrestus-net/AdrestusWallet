import HashFunction from "../crypto/HashFunction";

test('HashFunctionTest', () => {
     var message="password"
     var result="5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
     var hashfunc=new HashFunction()
     expect(result).toBe(hashfunc.hashString(message));
});