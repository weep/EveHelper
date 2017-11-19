using System.Collections.Generic;

namespace EveHelper.ORM.Interfaces
{
    public interface IEntityModel<TEntity>
    {
        TEntity Get(int id);
        IEnumerable<TEntity> GetMultiple(object filter);
        IEnumerable<TEntity> GetAll();
        long Insert(TEntity obj);
        long Insert(IEnumerable<TEntity> list);
        bool Update(TEntity obj);
        bool Update(IEnumerable<TEntity> list);
        bool Delete(TEntity obj);
        bool Delete(IEnumerable<TEntity> list);
        bool DeleteAll();
    }
}
