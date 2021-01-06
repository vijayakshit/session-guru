# import * as shell from "shelljs";


# shell.cp( "-R", "./src/_views", "dist/" );
# shell.cp( "-R", "./src/_modules/auth/_views", "./dist/_modules/auth/" );
# shell.cp( "-R", "./src/_modules/learner/_views", "./dist/_modules/learner/" );
# shell.cp( "-R", "./src/_modules/teacher/_views", "./dist/_modules/teacher/" );
cp -r public dist/
cp -r ./src/_modules/about/_views  ./dist/_modules/about/
cp -r ./src/_modules/auth/_views  ./dist/_modules/auth/
cp -r ./src/_modules/learner/_views ./dist/_modules/learner/
cp -r ./src/_modules/teacher/_views ./dist/_modules/teacher/