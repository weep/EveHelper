using Dapper;
using Dapper.Contrib.Extensions;
using EveHelper.DB.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EveHelper.DB.Models
{
    public abstract class EntityModel<TEntity> : IEntityModel<TEntity>, IDisposable where TEntity : class
    {
        public string Name { get; set; }
        public string Schema { get; set; } = "dbo";
        public abstract string CreateTableSQL { get; }

        IDbTransaction _transaction;
        protected readonly IDbConnection _connection;

        IMemoryCache _cache;

        public EntityModel(IDbConnection connection, IMemoryCache memoryCache)
        {
            _connection = connection;
            _cache = memoryCache;

            Initialize();
        }

        private void Initialize()
        {
            Name = GetType().Name;

            string cacheKey = $"Table_{Name}_cached";
            if (_cache.TryGetValue(cacheKey, out bool isCached) == false)
                return;

            try
            {
                _connection.Open();
                _transaction = _connection.BeginTransaction();
                Debug.Write($"New EntityModel<{Name}>");
            }
            catch (Exception ex)
            {
                Debug.Write($"Unable to open database {_connection}");
            }

            string schemaSQL = $"SELECT schema_id FROM sys.schemas WHERE name LIKE '{Schema}'";
            int schemaId = _connection.QuerySingle<int>(schemaSQL, transaction: _transaction);
            string tableKey = $"[{schemaId}].[{Name}]";

            if (schemaId == 0)
            {
                Debug.Write($"Creating schema [{schemaId}]");
                _connection.Execute("Create schema ", transaction: _transaction);
            }

            string tableSQL = $"select top 1 object_id from sys.tables where name = '{Name}' and schema_id = {schemaId}";
            if (_connection.QuerySingleOrDefault(tableSQL, transaction: _transaction) == null)
            {
                Debug.Write($"Creating table {tableKey}");
                _connection.Execute(CreateTableSQL, transaction: _transaction);
            }

            _cache.Set($"Table_{Name}_cached", true);
        }

        public void Dispose()
        {
            _transaction.Commit();
            _connection.Close();
        }

        public TEntity Get(int id)
        {
            return _connection.Get<TEntity>(id, transaction: _transaction); ;
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _connection.GetAll<TEntity>(transaction: _transaction);
        }

        public long Insert(TEntity obj)
        {
            return _connection.Insert(obj);
        }

        public long Insert(IEnumerable<TEntity> list)
        {
            return _connection.Insert(list, transaction: _transaction); ;
        }

        public bool Update(TEntity obj)
        {
            _cache.Remove(obj);

            return _connection.Update(obj, transaction: _transaction);
        }

        public bool Update(IEnumerable<TEntity> list)
        {
            return _connection.Update(list, transaction: _transaction);
        }

        public bool Delete(TEntity obj)
        {
            return _connection.Delete(obj, transaction: _transaction);
        }

        public bool Delete(IEnumerable<TEntity> list)
        {
            return _connection.Update(list, transaction: _transaction);
        }

        public bool DeleteAll()
        {
            return _connection.DeleteAll<TEntity>(transaction: _transaction);
        }

        //public new int Count => _connection.QueryFirst<int>($"select count(*) from {Schema}.{Name}", transaction: _transaction);

        //public new void Add(TEntity item)
        //{
        //var props = item.GetType().GetProperties().ToList();
        //string properties = string.Join(",", props);
        //string values = string.Join(",", props.Select(x => x.GetValue(item)).ToString());

        //string sql = $@"
        //insert into [{Schema}].[{Name}] ({properties}) values({values})
        //";

        //Debug.WriteLine(sql);
        //_connection.Execute(sql, item, transaction: _transaction);
        //}

        //public new void Clear() => _connection.Execute($"delete from {Schema}.{Name}", transaction: _transaction);

        //public new bool Contains(TEntity item) => _connection.Execute($"select top 1 id from {Schema}.{Name}", transaction: _transaction) != 1;

        //public new bool Remove(TEntity item) => _connection.Execute($"delete from {Schema}.{Name}", transaction: _transaction) == 1;

        //public new void AddRange(IEnumerable<TEntity> range)
        //{
        //foreach (TEntity entity in range)
        //Add(entity);
        //}

        //public void RemoveRange(IEnumerable<TEntity> range)
        //{
        //foreach (TEntity entity in range)
        //Remove(entity);
        //}
    }
}