<template>
<div class="">
    <el-row>
        <el-col :span="20">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="line-height: 36px; font-size: 20px;">{{ question.title }}</span>
                </div>
                <div class="">
                    {{ question.content }}
                </div>
                <br>
                <h3>Answers</h3>
                <div>
                    <el-card class="box-card" v-for="answer in question.Answers">
                        <h4>{{ answer.content }}</h4>
                        <br> - by {{answer.User.name}}
                    </el-card>

                </div>
                <h3>Submit your opinion!</h3>

                <el-input type="textarea" v-model="newQuestion.content" :rows="4"></el-input>
                <el-button type="primary" style="float: right; margin: 20px 0px;" @click="submitAnswer">Submit my answer</el-button>

            </el-card>
        </el-col>
    </el-row>

</div>
</template>
<script>
export default {
    data() {
        return {
            question: {},
            newQuestion: {
                content: '',
                questionId: '',
                userId: 1
            }
        }
    },
    created() {
        this.getItem()
    },
    methods: {
        getItem() {
            let self = this
            this.axios.get('/questions/slug/' + self.$route.params.slug).then(question => {
                self.question = question.data.data
                self.newQuestion.questionId = question.data.data.id
            })
        },
        submitAnswer() {
            let self = this
            this.axios.post('/answers/', self.newQuestion).then(x => {
                if (x.data.success) {
                    self.$message({
                        showClose: true,
                        message: 'Your answer submited!'
                    });
                    self.getItem()
                    self.newQuestion.content = ''

                } else {
                    console.log('something wrong');
                }
            })
        }
    }
}
</script>
<style>
map {
    width: 100%;
    height: 600px;
    display: block;
}
</style>
