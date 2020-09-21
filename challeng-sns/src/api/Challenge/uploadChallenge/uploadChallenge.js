import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadChallenge: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log(user.id);

      const {
        caption,
        category,
        // newPost,
        rel_challengers,
        pre_challengers,
        next_challengers,
        tag_challengers,
        // scope,
        textContent,
        files,
      } = args;
      console.log(files);

      // console.log(rel_persons)

      const making_hashtag = caption.replace("\n", " ").split(" ");

      //나중에 scope랑 newPost 삭제
      try {
        const post = await prisma.createPost({
          caption,
          category,
          textContent,
          user: { connect: { id: user.id } },
        });

        //Relation_challenger에 관한 함수
        //여러명의 값이 들어갈 수 있기 때문에 forEach문으로 작성
        if (rel_challengers != null) {
          rel_challengers.forEach(
            async (rel_challenger) =>
              //그냥은 들어가지 않아서 update유저로 갱신을 시켜주는 방식으로 제작하였습니다.
              await prisma.updateUser({
                data: {
                  relChallenger: {
                    connect: { id: post.id },
                  },
                },
                where: { id: rel_challenger },
              }),
            async (rel_challenger) =>
              await prisma.updatePost({
                data: {
                  relChallenger: {
                    connect: { id: rel_challenger },
                  },
                },
                where: { id: post.id },
              })
          );
        }

        console.log(rel_challengers);

        console.log("여기가 문제?");

        if (tag_challengers != null) {
          tag_challengers.forEach(
            async (tag_challenger) =>
              //그냥은 들어가지 않아서 update유저로 갱신을 시켜주는 방식으로 제작하였습니다.
              await prisma.updateUser({
                data: {
                  tagChallenger: {
                    connect: { id: post.id },
                  },
                },
                where: { id: tag_challenger },
              }),
            async (tag_challenger) =>
              await prisma.updatePost({
                data: {
                  tagChallenger: {
                    connect: { id: tag_challenger },
                  },
                },
                where: { id: post.id },
              })
          );
        }
        console.log("여기가 문제?");

        making_hashtag.forEach(async (hashtag) => {
          if (hashtag.includes("#")) {
            // upsert 안먹힘
            // await prisma.upsertHashtag({
            //   where: { tag_name: hashtag },
            //   update: {
            //     post: {
            //       connect: {
            //         id: post.id,
            //       },
            //     },
            //   },
            //   create: {
            //     post: {
            //       connect: {
            //         id: post.id,
            //       },
            //     },
            //   },
            // });
            try {
              // 존재하지 않는 태그라면 새로운 해시 태그 생성
              console.log(hashtag);
              await prisma.createHashtag({
                tag_name: hashtag,
                posts: {
                  connect: {
                    id: post.id,
                  },
                },
              });
            } catch (error) {
              // 이미 있는 해시 태그라면 그 태그 안에 post.id를 넣기
              console.log("ERROR");
              try {
                await prisma.updateHashtag({
                  data: {
                    posts: {
                      connect: {
                        id: post.id,
                      },
                    },
                  },
                  where: { tag_name: hashtag },
                });
                console.log(post.id);
              } catch (e) {
                console.log("e");
              }
            }
          }
        });

        console.log(post.id);

        // if (category == "video1") {
        //   files.forEach(
        //     async (file) =>
        //       await prisma.createVideo({
        //         video_url: file,
        //         post: {
        //           connect: {
        //             id: post.id,
        //           },
        //         },
        //       })
        //   );
        // } else if (category == "audio1") {
        //   console.log("1 audio:", files[0]);
        //   files.forEach(
        //     async (file) =>
        //       await prisma.createAudio({
        //         audio_url: file,
        //         audio_img_url: file,
        //         post: {
        //           connect: {
        //             id: post.id,
        //           },
        //         },
        //       })
        //   );
        // } else if (category == "image1") {
        //   files.forEach(
        //     async (file) =>
        //       await prisma.createImage({
        //         image_url: file,
        //         post: {
        //           connect: {
        //             id: post.id,
        //           },
        //         },
        //       })
        //   );
        // }

        files.forEach(
          async (file) =>
            await prisma.createFile({
              url: file,
              post: {
                connect: {
                  id: post.id,
                },
              },
            })
        );

        return post;
      } catch (error) {
        console.log("fail:", making_hashtag);
        making_hashtag.forEach(async (hashtag) => {
          if (hashtag.includes("#")) {
            console.log(hashtag);
          }
        });
      }
    },
  },
};
