'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import Link from "next/link";

interface IProps {
    data: ITrackTop[];
    title: string
}

const MainSlider = (props: IProps) => {
    const { data, title } = props

    const NextArrow = (props: any) => {
        return (
            <Button variant="contained" color="inherit"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35
                }}
            >
                <ChevronRightIcon />
            </Button>
        )
    }

    const PrevArrow = (props: any) => {
        return (
            <Button variant="contained" color="inherit"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    top: "25%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35
                }}
            >
                <ChevronLeftIcon />
            </Button>
        )
    }

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />

    };
    return (
        <Box
            sx={{
                margin: "0 50px",
                ".track": {
                    padding: "10px",
                    ".content": {
                        textAlign: "center",
                        ".img": {
                            display: "flex",
                            justifyContent: "center",
                            "img": {
                                height: "200px",
                                width: "200px"
                            }
                        },
                    }
                },
            }}
        >
            <h2>{title}</h2>
            <Slider {...settings}>
                {data.map(track => {
                    return (
                        <div className="track" key={track._id}>

                            <div className="content">
                                <Link href={`/track/${track._id}?audio=${track.trackUrl}`}>
                                    <div className="img">
                                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`} />
                                    </div>
                                    <h4>{track.title}</h4>
                                </Link>
                                <h5>{track.description}</h5>
                            </div>
                        </div>
                    )
                })}

            </Slider>
            <Divider />
        </Box>

    );
}

export default MainSlider