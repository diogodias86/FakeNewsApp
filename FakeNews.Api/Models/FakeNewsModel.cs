using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace FakeNews.Api.Models
{
    public class FakeNewsModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("date")]
        public DateTime Date { get; set; }

        [BsonElement("url_image")]
        public string UrlImage { get; set; }

        [BsonElement("url_detail")]
        public string UrlDetail { get; set; }

        [BsonElement("source")]
        public string source { get; set; }

        [BsonElement("content")]
        public string Content { get; set; }
    }
}
