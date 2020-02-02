using FakeNews.Api.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace FakeNews.Api.DataContext.Repositories
{
    public class FakeNewsRepository
    {
        private readonly MongoDbContext _mongoDbContext;

        public FakeNewsRepository(MongoDbContext mongoDbContext)
        {
            _mongoDbContext = mongoDbContext;
        }

        public FakeNewsModel GetById(string id)
        {
            return _mongoDbContext.FakeNewsCollection.Find(f => f.Id.Equals(id)).FirstOrDefault();
        }

        public List<FakeNewsModel> GetAllByFilter(string query)
        {
            var filterBuilder = Builders<FakeNewsModel>.Filter;
            var filter = filterBuilder.Empty;

            if (!string.IsNullOrEmpty(query))
            {
                var regex = new BsonRegularExpression($"/{query}/i");
                filter = filterBuilder.Regex(f => f.Title, regex) | filterBuilder.Regex(f => f.Content, regex);
            }

            return _mongoDbContext.FakeNewsCollection
                .Find(filter)
                .Project(f => new FakeNewsModel { Id = f.Id, Title = f.Title, Date = f.Date, UrlImage = f.UrlImage })
                .Sort("{date: -1}")
                .ToList();
        }
    }
}
