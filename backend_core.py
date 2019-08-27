"""
Created on August 24th, 2019
@author: hossein.mohebbi
"""
from Tasks.build_profile import ProfileBuilder
from Tasks.compare_profiles import compare_profiles
import json
import os
from time import sleep


class Main:
    def __init__(self):
        with open('team.json', 'w') as outfile:
            json.dump({}, outfile)

        lastKnownSizeOfFile = os.path.getsize('db.json')
        # print(os.path.getsize('judge.txt'))

        while os.path.getsize('db.json') == lastKnownSizeOfFile:
            sleep(1)
        sleep(3)
        with open('db.json') as json_file:
            data = json.load(json_file)

            print(data)
        length = len(data['users'])
        self.main_user = data["users"][0]

        self.other_users = [
            {'username': 'j_j_23', 'first name': 'Jesse', 'last name': 'West',
             'answers': ["Super Pumped for hack the 6!!",
                         "I'm  interested in learning about bioinformatics",
                         "Java", "First Year student at university of waterloo",
                         "I have 3 years experience coding and have been to 3 hackathons."]},
            {'username': 'e_james', 'first name': 'Eli', 'last name': 'James',
             'answers': ["MHM!",
                         "I want to be learning about machine learning",
                         "Python", "Second Year student at Harvard",
                         "I have 2 years experience developing exp. Fairly new."]},
            {'username': 'p_brown', 'first name': 'Pat', 'last name': 'Brown',
             'answers': ["I can’t wait!",
                         "I really want to use Blockchain and learn about its many applications",
                         "Java", "Fourth Year student at Wilfred Laurier University",
                         "I have over 5 years of experience in coding and have been to countless hackathons."]},
            {'username': 'mac_j12', 'first name': 'Mackenzie', 'last name': 'Jennings',
             'answers': ["Yeah!",
                         "I would like to learn more about the applications of VR/AR",
                         "Best at Python", "Just finishing grade 12",
                         "I have 2 years experience coding and this is my first hackathon."]},
            {'username': 't_webb', 'first name': 'Taylor', 'last name': 'Webb',
             'answers': ["Very Excited!",
                         "Deep Learning seems pretty interesting to look at",
                         "JS for sure", "First Year student at UofT",
                         "I have lots of experience in coding but this is my first hackathon."]},
            {'username': 'nelly_wilson', 'first name': 'Nelly', 'last name': 'Wilson',
             'answers': ["Can’t wait to learn new things",
                         "I am very passionate about IOT Development",
                         "JavaScript", "Finishing up highshcool haha.",
                         "Been to one hackathon, but very eager to learn."]},
            {'username': 'j_bell', 'first name': 'Jordan', 'last name': 'Bell',
             'answers': ["Sure!",
                         "I really like artificial intelligence.",
                         "C++", "First Year student at York University",
                         "I have 4 year experience in coding and this is my first hackathon."]},
            {'username': 'alex_j', 'first name': 'Alex', 'last name': 'Jean',
             'answers': ["Yessir!",
                         "I'm super interested in complex business analytic models.",
                         "Python", "4th Year student at York University",
                         "I have 4 year of really strong experience in coding and this is my 5th hackathon."]}
        ]

        self.answers = self.main_user['answers']
        self.teammates_needed_num = int(self.answers[2])
        del self.answers[2]
        del self.answers[1]
        self.main_profile = ProfileBuilder(self.answers).profile

        self.other_users_len = len(self.other_users)
        self.match_scores = []
        self.match_data = []

        # order still maintained
        for i in range(self.other_users_len):
            self.match_data.append((compare_profiles(self.main_profile, ProfileBuilder(self.other_users[i]['answers']).profile),
                                      self.other_users[i]['username'],
                                      self.other_users[i]['first name'],
                                      self.other_users[i]['last name']))

            self.match_scores.append(compare_profiles(self.main_profile, ProfileBuilder(self.other_users[i]['answers']).profile))

        self.team = {"members": []}
        self.interests = ["Similar Technological Interests!", "New Coder, but Eager Learner!", "Experienced Developer",
                        "Strong Education", "Backend Developer!", "Similar Level of Experience!", "FrontEnd Developer!",
                        "Experienced Developer", "Similar Technological Interests!", "Strong Education and Experience"]
        self.image_links = ['https://www.face-agency.co.uk/images/uploads/models/large/1539856973-21.jpg',
                            'https://img.ohmymag.co.uk/article/480/viral/thylane-blondeau-the-young-french-woman-elected-most-beautiful-face-of-2018_59efc87e03874efb6b259b053bb3257c16cf6abf.jpg',
                            'https://cdn.pixabay.com/photo/2016/10/09/18/03/smile-1726471_960_720.jpg',
                            'https://call4tutor.com/upload/0K3RxIMG-20181124-WA0010.jpg',
                            'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-768x512.jpg',
                            'https://cccmaker.com/wp-content/uploads/2018/09/kevin-1.png',
                            'http://www.hosseinmohebbi.com/profile1.jpg',
                            'https://bittaxer.com/wp-content/uploads/2018/03/danielle-profile-bittaxer.jpg',
                            'http://view.factsmgt.com/ch-me/staff186_2.jpg',
                            'https://avatars3.githubusercontent.com/u/8812246?s=460&v=4',
                            'https://cmuchippewas.com/images/2018/11/13/Grahovac_t_cm_2018H_345_020.jpg?width=300']

        # need to track name and user name
        self.match_scores.sort()
        for i in range(self.teammates_needed_num):
            for j in range(self.other_users_len):
                if self.match_scores[i] == self.match_data[j][0]:
                    self.team['members'].append({"userName": self.match_data[j][1],
                                      "firstName": self.match_data[j][2],
                                      "lastName": self.match_data[j][3],
                                      "interest": self.interests[j],
                                      "pic": self.image_links[j]})


        with open('team.json', 'w') as outfile:
            json.dump(self.team, outfile)


if __name__ == '__main__':
    window = Main()
    print(window.team)
