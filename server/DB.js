import {createRequire} from "module";
const require = createRequire(import.meta.url);

var fs = require('fs');
const { Sequelize , DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/mydb');

try {
  await sequelize.authenticate();
  console.log('Connection has successfully been established');
} catch (error) {
  console.error('Unable to connect to the database', error);
}

Class Products extends Model {}
Products.init({{
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    slogan: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING(1500)
    },
    CATEGORY: {
      type: DataTypes.STRING(100)
    },
    default_price: {
      type: DataType.INT
    }
  }, {
    modelName: 'products',
    tableName: 'products',
    seqeulize
  }
})

Class Questions extends Model {}
Questions.init({{
  question_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER
  },
  question_body: {
    type: DataTypes.STRING(1500)
  },
  question_date: {
    type: DataTypes.DATE
    defaultValue: DataTypes.NOW
  },
  asker_name: {
    type: DataTypes.STRING
  },
  asker_email: {
    type: DataTypes.STRING
  },
  reported: {
    type: DataTypes.INTEGER,
    defaultValue: 0;
  },
  helpful: {
    type: DataTypes.INTEGER,
    defaultValue: 0;
  }
  },{
    modelName: 'questions',
    tableName: 'questions',
    seqeulize
  }
});
Questions.

// Creates Model
const Answers = seqeulize.define('answers', {
  answer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateWritten: {
    type: DataTypes.Date,
    defaultValue: DataTypes.NOW
  },
  answererName: {
    type: DataTypes.STRING
  },
  answerer_email: {
    type: DataTypes.STRING
  },
  reported: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }.
  helpful: {
    type: DataTypes.INTEGER,
    defaultValues: 0
  }
})


