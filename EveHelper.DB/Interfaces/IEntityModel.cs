﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EveHelper.DB.Interfaces
{
    public interface IEntityModel<TEntity>
    {
        TEntity Get(int id);
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