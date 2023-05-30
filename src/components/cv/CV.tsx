import { Document, Page, View, Text, Image, StyleSheet, Font, Link } from '@react-pdf/renderer';
import WorkSans from "../../assets/fonts/work-sans/WorkSans-Regular.ttf";
import WorkSansBold from "../../assets/fonts/work-sans/WorkSans-Bold.ttf";
import OpenSans from "../../assets/fonts/open-sans/OpenSans-Semibold.ttf";
import Rubik from "../../assets/fonts/rubik/Rubik-Regular.ttf";
import Whatsapp from "../../assets/images/icons/whatsapp.png";
import QRcodeWhatsapp from "../../assets/images/icons/qrcode-whatsapp.png";
import { Fragment, useEffect, useState } from 'react';
import { capitalizeFirstLetter } from "../../utils/commons";
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

Font.register({
    family: "WorkSans",
    src: WorkSans
});

Font.register({
    family: "WorkSansBold",
    src: WorkSansBold
});

Font.register({
    family: "OpenSans",
    src: OpenSans
});

Font.register({
    family: "Rubik",
    src: Rubik
});

Font.registerHyphenationCallback(word => (
    [word]
));

const styles = StyleSheet.create({
    page: {
        paddingTop: 60,
        paddingBootom: 50,
        paddingRight: 32,
        paddingLeft: 32,
        backgroundColor: '#FFF',
        fontFamily: "WorkSans",
        fontSize: 10.5,
        lineHeight: 1.6,
        position: "relative",
        top: -30,
        wordWrap: "normal"
    },
    sectionHeader: {
        margin: 10,
        padding: 10,
    },
    title: {
        fontFamily: "Rubik",
        fontSize: 28,
        letterSpacing: 0.5,
        lineHeight: 1.3
    },
    subtitle: {
        fontFamily: "Rubik",
        fontSize: 14.5,
        letterSpacing: 0.5,
        marginLeft: 1,
        marginBottom: 2,
    },
    text: {
        marginTop: 10,
        marginLeft: 1,
        color: "#555555",
        textAlign: "justify"
    },
    text2: {
        marginLeft: 1,
        color: "#555555",
        marginBottom: 6
    },
    text3: {
        marginTop: 5,
        marginLeft: 1,
        color: "#555555",
        marginBottom: 6,
    },
    row: {
        flexDirection: "row",
        marginRight: 22,
        marginLeft: 22,
        paddingBottom: 50,
    },
    columnLeft: {
        width: 471,
        marginRight: 40,
    },
    columnRigth: {
        width: 430,
    },
    sectionTitle: {
        fontFamily: "OpenSans",
        fontSize: 16,
        position: "relative",
        left: -0.5,
        letterSpacing: 0.5
    },
    sectionTitle2: {
        marginTop: 16,
        fontFamily: "OpenSans",
        fontSize: 16,
        position: "relative",
        left: -0.5,
        letterSpacing: 0.5
    },
    sectionTitle3: {
        marginTop: 16,
        marginBottom: 12,
        fontFamily: "OpenSans",
        fontSize: 16,
        position: "relative",
        left: -0.5,
        letterSpacing: 0.5
    },
    sectionSubTitle: {
        marginTop: 12,
        fontFamily: "WorkSansBold",
        fontSize: 11,
        letterSpacing: 0.2,
        marginLeft: 1,
    },
    sectionSubTitleAlt: {
        fontFamily: "WorkSansBold",
        letterSpacing: 0.2,
        marginLeft: 1,
        color: "#666666",
    },
    sectionSubTitleAlt2: {
        fontFamily: "WorkSansBold",
        letterSpacing: 0.2,
        marginLeft: 1,
        color: "#434343",
        textAlign: "justify"
    },
    categoryTitle: {
        marginTop: 12,
        marginBottom: 4,
        fontFamily: "WorkSansBold",
        fontSize: 11.7,
        letterSpacing: 0.2,
        marginLeft: 1,
        color: "#434343",
    },
    categoryTitleAlt: {
        fontFamily: "WorkSansBold",
        letterSpacing: 0.2,
        marginLeft: 1,
        color: "#434343",
    },
    progressBar: {
        marginBottom: 8,
    },
    progress: {
        marginTop: 1,
        padding: 0,
        width: "100%",
        height: 10,
        backgroundColor: "#dadada",
        overflow: "hidden",
        borderRadius: 4
    },
    bar: {
        position: "relative",
        float: "left",
        minWidth: "1%",
        height: "100%",
        backgroundColor: "#7a7a7a"
    },
    infoBox: {
        marginTop: 12,
    },
    info: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 6
    },
    infoLabel: {
        fontFamily: "WorkSansBold",
        color: "#434343",
    },
    infoText: {
        color: "#555555",
    },
    containerWhatsapp: {
        marginTop: 14,
        backgroundColor: "#f4f4f4",
        borderRadius: 10,
        padding: 10,
        textAlign: "center"
    },
    containerIcons: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 2,
        marginBottom: 4,
    },
    containerQRCode: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 4,
        marginBottom: 7,
    },
    iconWhatsapp: {
        marginTop: 7,
        width: 60,
        height: 51,
        marginBottom: 7,
    },
    iconQRCode: {
        width: 110,
        height: 110,
    },
});

const CV = ({ profile }: any) => {
    const [profileCV, setProfileCV] = useState<any>(null);
    const [experienceCV, setExperienceCV] = useState<any>(null);
    const [educationCV, setEducationCV] = useState<any>(null);
    const [skillCV, setSkillCV] = useState<any>(null);
    const [knowledgeCV, setKnowledgeCV] = useState<any>(null);

    useEffect(() => {
        setProfileCV(profile);
    }, [profile]);

    useEffect(() => {
        if(profileCV?.education) {
            let education = [...profileCV.education];
            education = education.map((education) => {
                return {
                    ...education,
                    from: capitalizeFirstLetter(moment(education.from).format("MMMM")) + " " + moment(education.from).format("YYYY"),
                    to: capitalizeFirstLetter(moment(education.to).format("MMMM")) + " " + moment(education.to).format("YYYY")
                }
            });
            setEducationCV(education);
        }
    }, [profileCV]);

    useEffect(() => {
        if(profileCV?.experiences) {
            let experiences = [...profileCV.experiences];
            experiences = experiences.map((experience) => {
                return {
                    ...experience,
                    from: capitalizeFirstLetter(moment(experience.from).format("MMMM")) + " " + moment(experience.from).format("YYYY"),
                    to: capitalizeFirstLetter(moment(experience.to).format("MMMM")) + " " + moment(experience.to).format("YYYY")
                }
            });
            setExperienceCV(experiences);
        }
    }, [profileCV]);

    useEffect(() => {
        if(profileCV?.skills && profileCV?.categoriesSkill) {
            const skills = [...profileCV.skills];
            const skillsByCategory:any = [];

            profileCV.categoriesSkill.forEach((category: any) => {
                skillsByCategory.push({[category.name]: skills.filter((skill) => skill.categorySkill.name === category.name)});
                setSkillCV(skillsByCategory);
            });
        }
    }, [profileCV]);

    useEffect(() => {
        if(profileCV?.knowledge && profileCV?.categoriesKnowledge) {
            const knowledge = [...profileCV.knowledge];
            const knowledgeByCategory:any = [];

            profileCV.categoriesKnowledge.forEach((category: any) => {
                knowledgeByCategory.push({[category.name]: knowledge.filter((knowledge) => knowledge.categoryKnowledge.name === category.name)});
                setKnowledgeCV(knowledgeByCategory);
            });
        }
    }, [profileCV]);

    return (
        <Document>
            <Page size="A4" style={styles.page} wrap={false}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.title}>{profileCV?.name}</Text>
                    <Text style={styles.subtitle}>{profileCV?.profession}</Text>
                    <Text style={styles.text}>
                        {profileCV?.aboutMe}
                    </Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.columnLeft}>
                        <View>
                            <Text style={styles.sectionTitle}>EXPERIÊNCIA</Text>
                        </View>
                        {
                            experienceCV && experienceCV.length > 0 ? experienceCV.map((experience:any, key:any) => (
                                <View key={key}>
                                    <Text style={styles.sectionSubTitle} >
                                        {experience.position}, {experience.company}, {experience.location}
                                    </Text>
                                    <Text style={styles.sectionSubTitleAlt}>{experience.from} ~ {experience.to}</Text>
                                    <Text style={styles.text} >
                                        {experience.description}
                                    </Text>
                                </View>
                            )) : null
                        }
                        <View>
                            <Text style={styles.sectionTitle2}>FORMAÇÃO ACADÊMICA</Text>
                        </View>
                        {
                            educationCV && educationCV.length > 0 ? educationCV.map((education:any, key:any) => (
                                <View key={key}>
                                    <Text style={styles.sectionSubTitle}>
                                        {education.degree} em {education.specialization} ({education.status})
                                    </Text>
                                    <Text style={styles.sectionSubTitleAlt2}>{education.institution}</Text>
                                    <Text style={styles.sectionSubTitleAlt}>{education.from} ~ {education.to}</Text>
                                </View>
                            )) : null
                        }
                        <View>
                            <View>
                                <Text style={styles.sectionTitle3}>CONHECIMENTOS GERAIS</Text>
                            </View>
                            {
                                knowledgeCV && knowledgeCV.length > 0 ? knowledgeCV.map((knowledgeByCategory:any) => (
                                    Object.entries(knowledgeByCategory).map(([key, knowledge]:any) => (
                                        <View key={key}>
                                            {
                                                knowledge && knowledge.length > 0 ? (
                                                    <Fragment>
                                                        <Text style={styles.categoryTitleAlt}>{key}</Text>
                                                        <Text style={styles.text2}>
                                                            {
                                                            knowledge.map((knowledgeValue:any, key:any) => (
                                                                    <Fragment key={key}>
                                                                        {knowledgeValue.name}{ Object.keys(knowledge).pop()?.toString() !== key.toString() ? ', ' : ''}
                                                                    </Fragment>
                                                                ))
                                                            }
                                                        </Text>

                                                    </Fragment>
                                                ) : null
                                            }
                                        </View>
                                    ))
                                )) : null
                            }
                        </View>
                        <View style={styles.containerWhatsapp}>
                            <View style={styles.containerIcons}>
                                <Image src={Whatsapp} style={styles.iconWhatsapp} />
                            </View>
                            <Text style={styles.text3}>
                                Caso queira, você pode estar entrando contato diretamente comigo através do Whatsapp.
                            </Text>
                            <View style={styles.containerQRCode}>
                                <Image src={QRcodeWhatsapp} style={styles.iconQRCode} />
                            </View>
                            <Text style={styles.text3}>
                                Para iniciar uma conversa comigo, aponte a câmera do seu
                                celular para ler o QR Code acima ou clique no link a seguir:
                            </Text>
                            <Link src={"https://wa.me/55" + profileCV?.contacts?.phone.replace(/[^\w]/gi, '') + "?text=Olá"}>
                                https://wa.me/55{profileCV?.contacts?.phone.replace(/[^\w]/gi, '') }?text=Olá
                            </Link>
                        </View>
                    </View>
                    <View style={styles.columnRigth}>
                        <View>
                            <View>
                                <Text style={styles.sectionTitle}>DETALHES PESSOAIS</Text>
                            </View>
                            <View style={styles.infoBox}>
                                <View style={styles.info}>
                                    <Text style={styles.infoLabel}>Idade: </Text>
                                    <Text style={styles.infoText}>{profileCV?.age} anos</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.infoLabel}>Celular/WhatsApp: </Text>
                                    <Text style={styles.infoText}>{profileCV?.contacts?.phone}</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.infoLabel}>E-mail: </Text>
                                    <Text style={styles.infoText}>{profileCV?.user?.email}</Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.infoLabel}>Website: </Text>
                                    <Text style={styles.infoText}>
                                        <Link src={profileCV?.contacts?.website}>{profileCV?.contacts?.website}</Link>
                                    </Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.infoLabel}>Github:  </Text>
                                    <Text style={styles.infoText}>
                                        <Link src={profileCV?.social?.github}>{profileCV?.social?.github}</Link>
                                    </Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.infoLabel}>Linkedin:  </Text>
                                    <Text style={styles.infoText}>
                                        <Link src={profileCV?.social?.linkedin}>{profileCV?.social?.linkedin}</Link>
                                    </Text>
                                </View>
                                <View style={styles.info}>
                                    <Text style={styles.infoLabel}>Localização: </Text>
                                    <Text style={styles.infoText}>{profileCV?.contacts?.location}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.sectionTitle2}>HABILIDADES</Text>
                            </View>
                            {
                                skillCV && skillCV.length > 0 ? skillCV.map((skillsByCategory:any) => (
                                    Object.entries(skillsByCategory).map(([key, skills]:any) => (
                                        <View key={key}>
                                            {
                                                skills && skills.length > 0 ? (
                                                    <Fragment>
                                                        <Text style={styles.categoryTitle}>{key.toUpperCase()}</Text>
                                                        {
                                                            skills.map((skill:any, key:any) => (
                                                                <View key={key} style={styles.progressBar}>
                                                                    <Text style={styles.sectionSubTitleAlt}>{skill.name}</Text>
                                                                    <View style={styles.progress}>
                                                                        <Text style={{ ...styles.bar, width: skill.level + "%" }} ></Text>
                                                                    </View>
                                                                </View>
                                                            ))
                                                        }
                                                    </Fragment>
                                                ) : null
                                            }
                                        </View>
                                    ))
                                )) : null
                            }
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}


export default CV;
