const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id:'1',
            name:'mike',
            room:'node course'
        }, {
            id:'2',
            name:'john',
            room:'react course'
        }, {
            id:'3',
            name:'bucky',
            room:'node course'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id:'123',
            name: 'Andrew',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove the user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2)
    })
    it('should not remove the user', () => {
        
    })
    it('should find the user', () => {
        var userId = '3';
        var user = users.getUser(userId)
        expect(user.id).toBe(userId);
    })
    it('should not find the user', () => {
        var userId = '99';
        var user = users.getUser(userId) 
        expect(user).toNotExist
    })
    
    it('should return names for node course', () => {
        var userList = users.getUserList('node course');
        expect(userList).toEqual(['mike','bucky']);
    })

    it('should return names for react course', () => {
        var userList = users.getUserList('react course');
        expect(userList).toEqual(['john']);
    })
})