using FakeNews.Api.Models;
using MongoDB.Driver;

namespace FakeNews.Api.DataContext
{
    public class MongoDbContext
    {
        private static MongoClient _client = null;
        private static IMongoDatabase _db = null;

        public MongoDbContext()
        {
            if (_client == null) _client = new MongoClient("mongodb://root:root@localhost:27017");
            if (_db == null) _db = _client.GetDatabase("fake_news");
        }

        public IMongoCollection<FakeNewsModel> FakeNewsCollection => _db.GetCollection<FakeNewsModel>("fakes");
    }
}
